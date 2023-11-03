import { FC } from "react";

interface ContentProps {
  text: string | null | undefined;
}

export const Content: FC<ContentProps> = ({ text }) => {
  const makeLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((word, index) => {
      if (word.match(urlRegex)) {
        return (
          <a className="text-blue-500 underline" key={index} href={word}>
            {word}
          </a>
        );
      } else {
        return <span key={index}>{word}</span>;
      }
    });
  };

  const textWithLinks = text ? makeLinks(text) : null;

  return <p className="break-words whitespace-pre-wrap">{textWithLinks}</p>;
};
