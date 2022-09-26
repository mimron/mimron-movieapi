const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const movieValidation = require('../../validations/movie.validation');
const movieController = require('../../controllers/movie.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMovies'), validate(movieValidation.createMovie), movieController.createMovie)
  .get(validate(movieValidation.getMovies), movieController.getMovies);

router
  .route('/:movieId')
  .get(validate(movieValidation.getMovie), movieController.getMovie)
  .patch(auth('manageMovies'), validate(movieValidation.updateMovie), movieController.updateMovie)
  .delete(auth('manageMovies'), validate(movieValidation.deleteMovie), movieController.deleteMovie);

router.route('/vote/:movieId').patch(auth('voteMovies'), validate(movieValidation.voteMovie), movieController.voteMovie);
router.route('/unvote/:movieId').patch(auth('voteMovies'), validate(movieValidation.voteMovie), movieController.unvoteMovie);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management and retrieval
 */

/**
 * @swagger
 * path:
 *  /movies:
 *    post:
 *      summary: Create a movie | Only admins can create movies.
 *      description: Only admins can create movies.
 *      tags: [Movies]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *                - duration
 *                - artists
 *                - genres
 *                - watchUrl
 *              properties:
 *                title:
 *                  type: string
 *                  description: must be unique
 *                description:
 *                  type: string
 *                duration:
 *                  type: number
 *                artists:
 *                  type: string
 *                genres:
 *                  type: string
 *                watchUrl:
 *                  type: string
 *                  format: link url
 *              example:
 *                title: Transformers
 *                description: An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons.
 *                duration: 60
 *                artists: Shia LaBeouf, Megan Fox, Josh Duhamel
 *                genres: Action, Adventure
 *                watchUrl: https://www.vidio.com/premier/5461/transformers
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Movie'
 *        "400":
 *          $ref: '#/components/responses/DuplicateTitle'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Everyone can Sort By, Filter and retrieve all movie with pagination.
 *      description: All Users & Admins can Sort By, Filter and retrieve all movie with pagination.
 *      tags: [Movies]
 *      parameters:
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          description: title
 *        - in: query
 *          name: description
 *          schema:
 *            type: string
 *          description: description
 *        - in: query
 *          name: duration
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Duration number
 *        - in: query
 *          name: artists
 *          schema:
 *            type: string
 *          description: artists
 *        - in: query
 *          name: genres
 *          schema:
 *            type: string
 *          description: genres
 *        - in: query
 *          name: watchUrl
 *          schema:
 *            type: string
 *          description: watchUrl
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. totalVote:desc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of movies
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Movie'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /movies/{id}:
 *    get:
 *      summary: Get a movie | Everyone can Play/fetch detail movie information.
 *      description: Everyone can Play/fetch detail movie information and add count total view.
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Movie id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Movie'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a movie | Only admins can update movies.
 *      description: Only admins can update movies.
 *      tags: [Movies]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Movie id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: must be unique
 *                description:
 *                  type: string
 *                duration:
 *                  type: number
 *                artists:
 *                  type: string
 *                genres:
 *                  type: string
 *                watchUrl:
 *                  type: string
 *                  format: link url
 *              example:
 *                title: Transformers
 *                description: An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons.
 *                duration: 60
 *                artists: Shia LaBeouf, Megan Fox, Josh Duhamel
 *                genres: Action, Adventure
 *                watchUrl: https://www.vidio.com/premier/5461/transformers
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Movie'
 *        "400":
 *          $ref: '#/components/responses/DuplicateTitle'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a movie | Only admins can delete movies.
 *      description: Only admins can delete movies.
 *      tags: [Movies]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Movie id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /movies/vote/{id}:
 *
 *    patch:
 *      summary: Add Vote | Only users can add vote movies
 *      description:
 *      tags: [Movies]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Movie id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Movie'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */

/**
 * @swagger
 * path:
 *  /movies/unvote/{id}:
 *
 *    patch:
 *      summary: Unvote  | Only users can unvote movies
 *      description:
 *      tags: [Movies]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Movie id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Movie'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */
