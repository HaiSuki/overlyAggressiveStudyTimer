import { useEffect, useState } from "react";

import Modal from "react-modal";

export const RainbowText = ({ text }: { text: string }) => {
  const texts = [];

  for (let i = 0; i < text.length; i++) {
    texts.push(
      <span
        style={{
          color: `hsl(${(i * 360) / text.length}, 100%, 50%)`,
        }}
      >
        {text[i]}
      </span>,
    );
  }

  return texts;
};

function StartupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // checks local storage for if it is first time visit, if so add to localstorage and set the modal to be open!
    // if (localStorage.getItem("first")) {
    //   setIsOpen(false);
    // } else {
    //   localStorage.setItem("first", "true");
    //   setIsOpen(true);
    // }
    setIsOpen(true);
  }, []);

  // this bit is the startup window and allat
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          zIndex: 12379813721,
        },
      }}
      contentLabel="Example Modal"
    >
      <div className="relative z-20 w-full text-center">
        <h1 className="text-4xl pb-6 funny-font text-center text-black">
          this is an overly aggressive study timer
        </h1>
        <div className="gap-2 flex-col">
          <p className="text-2xl funny-font text-center text-[#de5952]">
            {
              <RainbowText text="do average study timers not threaten you enough?" />
            }
          </p>

          <p className="text-2xl pt-2 funny-font text-center text-black">
            need to study ????????
          </p>

          <p className="text-2xl pt-2 funny-font text-center text-black">
            enter how long you want to study (and rest breaks!!)
          </p>

          <p className="text-2xl pt-2 funny-font text-center text-black">
            ... .. and get ready to study
          </p>

          <p className="text-2xl pt-2 funny-font text-center text-black">
            (or else)
          </p>
          <br />
          <p className="text-xl pt-2 funny-font text-center text-black">
            set your study time, break time, and how many 'relays' youd like to
            do
          </p>
          <p className="text-xl pt-2 funny-font text-center text-black">
            do not tab out or move your mouse while studying.
          </p>
          <p className="text-xl pt-2 funny-font text-center text-black">
            cus then how do i know youre ACTUALLY studying ;)
          </p>
        </div>

        <div className="flex justify-center h-[100%] pt-6">
          <a
            className="bg-[#de5952] hover:bg-[#b84741] cursor-pointer hover:text-white funny-font w-full h-full p-2 text-white border-8 border-[#9a403b]"
            onClick={closeModal}
          >
            i am ready.
          </a>
        </div>
      </div>
    </Modal>
  );
}
//wowee!

export default StartupModal;
