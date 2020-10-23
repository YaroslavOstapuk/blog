<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media as MediaAlias;
use Spatie\MediaLibrary\Models\Media;

class Post extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $guarded = ['id'];

    public function registerMediaConversions(MediaAlias $media = null): void
    {
        $this->addMediaConversion('avatar')
            ->format('jpg')
            ->quality(90)
            ->fit('crop', 450, 225)
            ->nonQueued();
    }
}
