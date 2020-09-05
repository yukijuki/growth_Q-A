from flask import Flask, request, session, after_this_request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import datetime
import json
import uuid


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
app.config["SECRET_KEY"] = "super-secret"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["JSON_AS_ASCII"] = False


app.debug = True
db = SQLAlchemy(app)

CORS(app)

# Define Models

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80))
    title = db.Column(db.String(80), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    reward = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime())

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(80))
    post_id = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    text = db.Column(db.Text(), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime())

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    like_id = db.Column(db.String(80), nullable=False, unique=True)
    comment_id = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.String(80), nullable=False)
    like = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime())

# db.drop_all()
# db.create_all()

@app.route("/")
def test():
    return "Running"

@app.route("/test", methods=["GET"])
def test1():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    
    response_post = []

    for post in posts:

        post_data = {
            "post_id": post.post_id,
            "category": post.category,
            "title": post.title,
            "text": post.text
        }

        response_post.append(post_data)

    return Response(response=json.dumps(response_post), status=200)

# -------------------Post page-------------------
@app.route("/posts_get", methods=["GET"])
def posts_get():

    category = request.args.get('category')
    
    if category is None:
        category = "All"

    if category == "All":
        posts = Post.query.order_by(Post.created_at.desc()).all()
    else:
        posts = Post.query.filter_by(category=category).filter_by(is_active=True).order_by(Post.created_at.desc()).all()

    
    response_post = []

    for post in posts:

        post_data = {
            "post_id": post.post_id,
            "category": post.category,
            "title": post.title[:20] + " ..",
            "text": post.text[:105] + "...",
        }

        response_post.append(post_data)

    return  Response(response=json.dumps(response_post), status=200)


@app.route("/posts_post", methods=["POST"])
def posts_post():

    post_id = str(uuid.uuid4())
    email = request.json['email']
    title = request.json['title']
    text = request.json['text']
    category = request.json['category']

    post = Post(
        post_id = post_id,
        email = email, 
        title = title,
        text = text,
        category = category,
        created_at=datetime.datetime.now()
    )
    db.session.add(post)
    db.session.commit()

    response_post = {
        "post_id": post_id,
        "email": email,
        "title": title,
        "text": text,
        "category": category
    }

    return  Response(response=json.dumps(response_post), status=200)

# -------------------Comment page-------------------

@app.route("/comments_get", methods=["GET"])
def comments_get():

    post_id = request.args.get('post_id')
    user_id = request.args.get('user_id')

    post = Post.query.filter_by(post_id=post_id).filter_by(is_active=True).first()
    comments = Comment.query.filter_by(post_id=post_id).filter_by(is_active=True).order_by(Comment.created_at.desc()).all()

    response = []

    post = {
        "title": post.title,
        "text": post.text,
        "comments_num": len(comments)
    }

    response.append(post)

    for comment in comments:
        like = Like.query.filter_by(comment_id=comment.comment_id).filter_by(like=True).all()
        like_bool = Like.query.filter_by(comment_id=comment.comment_id).filter_by(like=True).filter_by(user_id=user_id).first()
        
        if like_bool:
            like_bool_judge = True
        else:
            like_bool_judge = False

        comment_data = {

            "comment_id": comment.comment_id,
            "name": comment.name,
            "text": comment.text,
            "like": len(like),
            "judge": like_bool_judge

        }

        response.append(comment_data)

    return  Response(response=json.dumps(response), status=200)


@app.route("/comments_post", methods=["POST"])
def comments_post():

    comment_id = str(uuid.uuid4())
    text = request.json['text']
    post_id = request.json['post_id']
    name = request.json['name']

    comment = Comment(
        comment_id = comment_id,
        post_id = post_id,
        name = name,
        text = text,
        created_at=datetime.datetime.now()
    )
    print(comment)

    db.session.add(comment)
    db.session.commit()

    response_comment = {
        "comment_id": comment_id,
        "name": name,
        "text": text
    }

    return Response(response=json.dumps(response_comment), status=200)
    
@app.route("/like_post", methods=["POST"])
def like_post():

    like_id = str(uuid.uuid4())
    comment_id = request.json['comment_id']
    user_id = request.json['user_id']

    like_bool = Like.query.filter_by(comment_id=comment_id).filter_by(user_id=user_id).first()
    print(like_bool)
    if like_bool:
        db.session.delete(like_bool)
        db.session.commit()

        data = {
            "comment_id": comment_id,
            "action": "delete"
        }

        return Response(response=json.dumps(data), status=200)

    else:
        like = Like(
            like_id = like_id,
            comment_id = comment_id,
            user_id = user_id,
            like = True,
            created_at=datetime.datetime.now()
        )

        db.session.add(like)
        db.session.commit()

        data = {
            "comment_id": comment_id,
            "action": "add"
        }

        return Response(response=json.dumps(data), status=200)

if __name__ == "__main__":
    app.run(debug=True)