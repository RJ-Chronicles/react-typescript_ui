const About = () => {
  return <section id="about" className="mx-auto about-container">
  <div className="md:mx-16 pt-12">
    <h2 className="text-center font-sans text-4xl md:text-6xl font-semibold">
      About Us
    </h2>
    <div className="flex flex-col md:flex-row md:justify-center md:items-center md:py-20">
      <div className="none w-full md:block md:w-1/2 pt-4">
        <img
          src="https://do-not-delete-bucket1.s3.ap-south-1.amazonaws.com/image-devices.png"
          className="rounded-sm hover:translate-x-2 duration-500"
          alt=""
        />
      </div>
      <div className="font-normal tracking-wide w-full md:w-1/2 p-2 text-justify first-letter:font-semibold first-letter:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        nobis beatae asperiores nesciunt enim non, hic eaque nemo commodi
        sequi illo? Et similique est, quia distinctio magnam quis animi
        repudiandae vitae eos aliquid velit possimus, quaerat eaque
        commodi autem optio ut expedita quae earum doloremque sit minus in
        sequi! At reiciendis in vitae placeat sunt unde id, alias cum!
        Excepturi odit architecto qui eligendi earum pariatur,
        reprehenderit veniam ducimus nostrum temporibus voluptatum
        obcaecati eveniet iste cumque dicta consequuntur sequi esse,
        repudiandae dolor voluptas ipsa. Aliquid culpa repellendus enim
        deserunt ducimus impedit quod aperiam voluptatibus beatae? Alias
        repellendus nisi veniam tenetur. Lorem ipsum dolor sit amet
        consectetur adipisicing elit.
      </div>
    </div>
  </div>
</section>;
};

export default About;
