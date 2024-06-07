import * as React from "react";
import Giscus from "@giscus/react";

const id = "inject-comments";

const Comments = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id}>
      {mounted ? (
        <Giscus
          id={id}
          repo="ikotun-dev/ikotun.dev"
          repoId="R_kgDOLtaffg"
          category="General"
          categoryId="DIC_kwDOLtaffs4Cf7HP"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={"dark_tritanopia"}
          lang="en"
          loading="lazy"
        />
      ) : null}
    </div>
  );
};

export default Comments;
