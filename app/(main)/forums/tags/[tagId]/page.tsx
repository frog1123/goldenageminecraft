import { Tag } from "@/components/threads/tag";
import { TagThreads } from "@/components/threads/tag-threads";
import { db } from "@/lib/db";
import { formatDateLong } from "@/utils/format-date-long";
import { Metadata, NextPage, ResolvingMetadata } from "next";

interface TagIdPageProps {
  params: {
    tagId: string;
  };
}

const TagIdPage: NextPage<TagIdPageProps> = async ({ params }) => {
  const tag = await db.tag.findUnique({
    where: { id: params.tagId },
    select: {
      name: true,
      _count: true,
      createdAt: true
    }
  });

  if (!tag)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <p className="text-center">:( Tag does not exist or cannot be found</p>
      </div>
    );

  return (
    <>
      <div className="grid grid-flow-col w-max gap-2 place-items-center">
        <span className="text-lg font-semibold">Threads containing</span>
        <Tag id={params.tagId} name={tag.name} />
      </div>
      <div className="grid grid-cols-2 gap-2 place-items-center">
        <p className="mr-auto uppercase text-xs font-bold text-zinc-500">Tag created {formatDateLong(tag!.createdAt.toString())}</p>
        <p className="ml-auto uppercase text-xs font-bold text-zinc-500 ">{tag._count.threads} Threads</p>
      </div>
      <TagThreads tagId={params.tagId} />
    </>
  );
};

export async function generateMetadata({ params }: TagIdPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const tag = await db.tag.findUnique({
    where: {
      id: params.tagId
    },
    select: {
      name: true,
      _count: {
        select: {
          threads: true
        }
      }
    }
  });

  if (!tag)
    return {
      title: "Tag",
      description: "Tag does not exist or cannot be found",
      openGraph: {
        title: "Tag",
        description: "Tag does not exist or cannot be found"
      }
    };

  return {
    title: `#${tag.name}`,
    description: `${tag._count.threads} threads have this tag`,
    openGraph: {
      title: `#${tag.name}`,
      description: `${tag._count.threads} threads have this tag`
    }
  };
}

export default TagIdPage;
