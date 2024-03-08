export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-about-wallpaper bg-cover">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7 text-stone-950 ">
            About HeWrites
          </h1>
          <div className="text-md font-semibold text-white flex flex-col gap-6">
            <p>
              Welcome to HeWrites, your{" "}
              <span className="text-black  ">
                {" "}
                ultimate destination for all things tech! At HeWrites, I'm{" "}
              </span>{" "}
              passionate about exploring the{" "}
              <span className="text-black ">
                {" "}
                ever-evolving landscape of technology, from the latest{" "}
              </span>
              advancements in programming languages{" "}
              <span className="text-black ">
                {" "}
                to the intricate workings of algorithms and
              </span>{" "}
              everything in between. My journey began{" "}
              <span className="text-black ">
                with a simple desire to share my fascination{" "}
              </span>{" "}
              with technology and its endless possibilities.
              <span className="text-black ">
                As avid tech enthusiast, I delve into a myriad{" "}
              </span>{" "}
              of topics, ranging from the fundamentals of software{" "}
              <span className="text-black ">
                engineering to the intricacies of{" "}
              </span>{" "}
              garbage collection and core workings of{" "}
              <span className="text-black ">systems.</span>
            </p>

            <p>
              What sets me apart is my commitment to delivering insightful,
              engaging, and accessible content. Whether you're a seasoned
              developer seeking to expand your knowledge or a curious newcomer
              eager to explore the world of tech, I've got you covered. Through
              my articles, tutorials, and in-depth analyses, I aim to demystify
              complex concepts, spark curiosity, and inspire innovation.
            </p>

            <p>
              Join me on this exciting journey as we unravel the mysteries of
              technology, one article at a time. Whether you're here to learn,
              explore, or simply indulge your passion for all things tech, I'm
              thrilled to have you along for the ride. Stay tuned for
              captivating content, thought-provoking discussions, and a glimpse
              into the ever-evolving world of technology. Welcome to HeWrites,
              where innovation knows no bounds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
