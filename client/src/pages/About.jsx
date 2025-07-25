import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={'https://res.cloudinary.com/dx4rloqv5/image/upload/v1752895361/about_img_ixnju5.png'}
          alt=""
          className="w-full md:max-w-[450px]"
          loading={'lazy'}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi,
            ullam quibusdam libero ipsam, blanditiis repellendus, molestiae
            error aliquam quas minima sed possimus nam! Velit blanditiis a,
            ipsam mollitia explicabo laudantium?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quos
            vitae facilis eligendi earum molestiae pariatur magni reiciendis
            saepe quibusdam cumque, quas animi neque voluptates temporibus
            consectetur nam. Eligendi, veritatis.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            aliquam iste ad, repellendus quas sunt molestias unde a qui facere!
            Quaerat ex saepe voluptas quisquam ipsam iusto quos ratione ipsa.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            minus et vitae aut velit odit voluptas corporis corrupti officia.{" "}
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p>
            {" "}
            className="text-gray-600"Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Doloribus minus et vitae aut velit odit voluptas
            corporis corrupti officia. Suscipi
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            minus et vitae aut velit odit voluptas corporis corrupti officia.
            Suscipi
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
