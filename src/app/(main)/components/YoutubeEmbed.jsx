import {getYoutubeId} from "@/lib/getYouTubeId"
export default function YoutubeEmbed({ url, caption }) {
  const id = getYoutubeId(url);
  if (!id) return null;

  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={caption || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
