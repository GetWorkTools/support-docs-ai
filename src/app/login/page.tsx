import { LoginView } from "@/client";
import { Header } from "@/client/components";

export default function LoginPage() {

  return (
    <main className="bg-grid flex flex-col justify-center min-h-screen">
      <Header />
      <div className="flex flex-col mt-24 items-center flex-1">
        <section>
          <div className="flex">
            <LoginView />
          </div>
        </section>
      </div>
    </main>
  );
};
