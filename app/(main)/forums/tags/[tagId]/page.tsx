import { NextPage } from 'next';

interface TagIdPageProps {
  params: {
    tagId: string;
  };
}

const TagIdPage: NextPage<TagIdPageProps> = async ({ params }) => {
  return (
    <div>
      <p>tag id: {params.tagId}</p>
    </div>
  );
};

export default TagIdPage;
