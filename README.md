# 18-social-internets
## Description
API for social media user database.  Users can have friends and thoughts.  The thoughts can have reactions.

### By: Caine Winters

## Usage Via Insomnia
Use appropriate GET, POST, PUT, and DELETE http requests to update and/or access the database.
API Routes instructions below were taken from the assignment's original README instructions.

### API Routes

**`/api/users`**

* `GET` all users

* `GET` a single user by its `_id` and populated thought and friend data

* `POST` a new user:

```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```

* `PUT` to update a user by its `_id`

* `DELETE` to remove user by its `_id`

**BONUS**: Remove a user's associated thoughts when deleted.  **DONE** ✅

---

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list

* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**

* `GET` to get all thoughts

* `GET` to get a single thought by its `_id`

* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```

* `PUT` to update a thought by its `_id`

* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field

* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value


### Screenshots (none)
No screenshot made for this challenge as there is no GUI to demo and the video-walkthrough covers functionality and results.

## Links
### [Link to repo](https://github.com/elcaine/18-social-internets)
### [Link to video walkthrough](https://youtu.be/2F_ACNk1SV4)

### Acknowledged sources
- Starter code based on previous activities.