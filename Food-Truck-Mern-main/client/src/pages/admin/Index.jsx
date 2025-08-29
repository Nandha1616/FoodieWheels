import { useSelector } from "react-redux";
import Layout from "../../components/layout/AdminRootLayout";
import { useCookies } from "react-cookie";
function Index() {
  const { userInfo, isLoggedIn, error } = useSelector((state) => state.user);
  const { token } = useCookies();

  return (
    <>
      <main className="grow">
        <div className="">
          {/* Dashboard actions */}
          <div className="sm:flex sm:justify-between sm:items-center mb-8  ">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0 bg-white h-full w-full md:min-h-[26.5rem] rounded-xl p-5 text-justify">
              <h1 className="text-2xl md:text-3xl text-gray-800  dark:text-gray-800 font-bold">
                Dashboard
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis nesciunt velit nostrum porro, dignissimos veniam quis
                accusamus assumenda odio vel nisi. Dolor veritatis quas natus
                laboriosam omnis debitis aperiam incidunt?Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Tenetur hic eveniet officia!
                Ab, maiores tempora atque, beatae fugit illum earum unde sed ut
                iusto deserunt. Nobis labore ipsum nihil dignissimos hic ad
                dicta, tenetur minus aliquid delectus eligendi corporis non
                alias asperiores eveniet. Quod non, id, et consectetur doloribus
                dolor nobis fugit quo ea fugiat explicabo ratione tempora
                maiores dicta aspernatur unde incidunt exercitationem iure. Et
                dolor repellendus exercitationem perspiciatis inventore nulla
                eos sunt maxime molestias repudiandae vel quidem dolores
                voluptatibus magnam tempore quas culpa ipsa similique natus
                quibusdam laborum rem, eius velit! Hic sunt nesciunt modi,
                commodi accusantium at a in, quam porro quidem corporis numquam
                mollitia tempora soluta doloribus dolor esse eaque ? Dolore
                officiis dolorum ullam
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Index;
