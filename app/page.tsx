import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post, allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function PostCard(post: Post) {
  return (
    <Card className="flex flex-col justify-around bg-slate-900">
      <CardHeader className="px-2">
        <CardTitle>
          <Link href={post.url} className="">
            {post.title}
          </Link>
        </CardTitle>
        <time dateTime={post.date} className="block text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </CardHeader>
      <CardDescription className="mb-8 px-2">
        <div
          className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 text-ellipsis line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.body.raw }}
        />
      </CardDescription>
    </Card>
  );
}

const getBio = async () => {
  const bioResponse = await fetch(
    "https://api.github.com/users/maxphillipsdev",
  );

  const data = await bioResponse.json();

  return data.bio;
};

export default async function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const bio = await getBio();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="overflow-hidden flex justify-between col-span-2">
        <Image
          src="https://avatars.githubusercontent.com/u/16758612?v=4"
          width={200}
          height={200}
          className="object-fill border-r grayscale"
          alt="me"
        />
        <CardHeader className="w-full">
          <CardTitle>Hi, I'm Max!</CardTitle>
          {bio && <CardDescription>{bio}</CardDescription>}
        </CardHeader>
      </Card>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
