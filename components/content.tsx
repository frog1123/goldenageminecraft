import { FC } from 'react';

interface ContentProps {
  text: string | null | undefined;
}

export const Content: FC<ContentProps> = ({ text }) => {
  const makeLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const imageRegex = /!\[img\]\((.*?)\)/g;

    const imageMatches = text.match(imageRegex);
    const textWithImageUrls = imageMatches
      ? text.split(imageRegex).map((part, index) => {
          if (index % 2 === 0) {
            return part.split(urlRegex).map((word, index) => {
              if (word.match(urlRegex)) {
                return (
                  <a className='text-blue-500 underline' key={index} href={word}>
                    {word}
                  </a>
                );
              } else {
                return <span key={index}>{word}</span>;
              }
            });
          } else {
            return <img key={index} src={part} alt='img' />;
          }
        })
      : text.split(urlRegex).map((word, index) => {
          if (word.match(urlRegex)) {
            return (
              <a className='text-blue-500 underline' key={index} href={word}>
                {word}
              </a>
            );
          } else {
            return <span key={index}>{word}</span>;
          }
        });

    return textWithImageUrls;
  };

  const textWithLinks = text ? makeLinks(text) : null;

  return <p className='break-words whitespace-pre-wrap'>{textWithLinks}</p>;
};
