import React, { useEffect, useState } from 'react';

// A tiny typewriter that types a word, holds, deletes it, and moves to the next —
// cycling forever. Drives a blinking caret alongside the text.
const RoleRotator = ({ words, typeSpeed = 85, deleteSpeed = 40, hold = 1500 }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1);
      timer = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, hold]);

  return (
    <span className="role-rotator">
      {text}
      <span className="role-caret" aria-hidden="true" />
    </span>
  );
};

export default RoleRotator;
