<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PostStore;
use App\Http\Requests\Api\UpdatePost;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostShowResource;
use App\Models\Post;
use App\Traits\UrlSlug;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;

class PostController extends Controller
{
    use UrlSlug;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }

    /**
     * @api {get} /api/v1/posts 1. Get All posts
     * @apiVersion 1.0.0
     * @apiName GetAllPosts
     * @apiGroup 02.Posts
     *
     * @apiParam {int} [page=1] Number page
     * @apiParam {int} [per_page=15] Count items
     *
     */
    public function index(Request $request)
    {
        $posts = Post::with('media')->orderByDesc('created_at')->paginate($request->per_page);

        return PostResource::collection($posts);
    }

    /**
     * @api {post} /api/v1/posts 2. Store post
     * @apiVersion 1.0.0
     * @apiName StorePost
     * @apiGroup 02.Posts
     *
     * @apiParam {file} images Main image post
     * @apiParam {string} title Title post
     * @apiParam {string} text Text
     *
     */
    public function store(PostStore $request)
    {
        $post = Post::create(Arr::except($request->validated(), 'images'));
        $this->setSlug($post, $post->title);
        $post->addMedia($request->images)->toMediaCollection();

        return response()->json(['message' => trans('system.post.store')], Response::HTTP_OK);
    }

    /**
     * @api {post} /api/v1/posts/{slug} 3. Show post
     * @apiVersion 1.0.0
     * @apiName ShowPost
     * @apiGroup 02.Posts
     *
     */
    public function show($slug)
    {
        $post = Post::with('media')->where('slug', $slug)->firstOrFail();

        return PostShowResource::make($post);
    }

    /**
     * @api {put/patch} /api/v1/posts/{slug} 4. Update posts
     * @apiVersion 1.0.0
     * @apiName UpdatePost
     * @apiGroup 02.Posts
     *
     * @apiParam {file} [images] Main image post
     * @apiParam {string} title Title post
     * @apiParam {string} text Text
     *
     */
    public function update(UpdatePost $request, $slug)
    {
        $post = Post::with('media')->where('slug', $slug)->firstOrFail();
        $post->update(Arr::except($request->validated(), 'images'));
        $this->setSlug($post, $post->title);
        if ($request->images) {
            $post->clearMediaCollection();
            $post->addMedia($request->images)->toMediaCollection();
        }

        return response()->json(['message' => trans('system.post.update')], Response::HTTP_OK);
    }

    /**
     * @api {delete} /api/v1/posts/{slug} 5. Destroy post
     * @apiVersion 1.0.0
     * @apiName DestroyPost
     * @apiGroup 02.Posts
     *
     */
    public function destroy($slug)
    {
        $post = Post::with('media')->where('slug', $slug)->firstOrFail();
        $post->delete();

        return response()->json(['message' => trans('system.post.destroy')]);
    }
}
