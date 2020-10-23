<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'text' => clean_text($this->text),
            'media' => [
                'avatar' => $this->getFirstMediaUrl('default', 'avatar'),
                'default' => $this->getFirstMediaUrl('default'),
            ]
        ];
    }
}
