from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_Origin
import datetime
import json
import uuid


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///site.db"
app.config["SECRET_KEY"] = "super-secret"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

app.debug = True
db = SQLAlchemy(app)

CORS(app, support_credentials=True)

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
    return "test verified"

# -------------------Post page-------------------
@app.route("/posts_get", methods=["GET"])
@cross_Origin(origin='*')
def posts_get():

    category = request.args.get('category')

    if category == "all":
        posts = Post.query.all()
    else:
        posts = Post.query.filter_by(category=category).filter_by(is_activae=True).all()

    
    response = []

    for post in posts:

        post_data = {
            "post_id": post.post_id,
            "category": post.category,
            "title": post.title[:20] + " ..",
            "text": post.text[:105] + "...",
            "created_at": post.created_at
        }

        response.append(post_data)

    return  json.dumps(response)


@app.route("/posts_post", methods=["POST"])
@cross_Origin(supports_credentials=True)
def posts_post():

    post_id = str(uuid.uuid4())
    email = request.args.get('email')
    title = request.args.get('title')
    text = request.args.get('text')
    category = request.args.get('category')

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

    return  json.dumps(post)

# -------------------Comment page-------------------

@app.route("/comments_get", methods=["GET"])
@cross_Origin(supports_credentials=True)
def comments_get():

    post_id = request.args.get('post_id')

    post = Post.query.filter_by(post_id=post_id).filter_by(is_activae=True).first()
    comments = Comment.query.filter_by(post_id=post_id).filter_by(is_activae=True).all()

    response = []

    post = {

        "post_id": post.post_id,
        "category": post.category,
        "title": post.title,
        "text": post.text,
        "created_at": post.created_at

    }

    response.append(post)

    for comment in comments:
        like = Like.query.filter_by(comment_id=comment.comment_id).filter_by(like=True).all()
        like_bool = Like.query.filter_by(comment_id=comment.comment_id).filter_by(like=True).filter_by(user_id=user_id).first()
        
        if like_bool:
            like_bool_judge = True

        comment_data = {

            "comment_id": comment.comment_id,
            "text": comment.text,
            "like": len(likes),
            "like": like_bool_judge,
            "created_at": comment.created_at

        }

        response.append(comment_data)

    return  json.dumps(response)


@app.route("/comments_post", methods=["POST"])
@cross_Origin(supports_credentials=True)
def comments_post():

    comment_id = str(uuid.uuid4())
    post_id = request.args.get('post_id')
    text = request.args.get('text')

    comment = Comment(
        comment_id = comment_id,
        post_id = post_id,
        text = text,
        created_at=datetime.datetime.now()
    )

    db.session.add(comment)
    db.session.commit()

    return  json.dumps(comment)
    
@app.route("/comments_like", methods=["POST"])
@cross_Origin(supports_credentials=True)
def comments_like():

    like_id = str(uuid.uuid4())
    comment_id = request.args.get('comment_id')
    user_id = request.args.get('user_id')
        
    like = Like(
        like_id = like_id,
        comment_id = comment_id,
        user_id = user_id,
        created_at=datetime.datetime.now()
    )

    db.session.add(like)
    db.session.commit()

    return  json.dumps(like)

if __name__ == "__main__":
    app.run(debug=True)