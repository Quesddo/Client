import Sign from "@/views/sign";
import LoginForm from "@/views/sign/components/LoginForm";

export default function Page() {
  return (
    <div className="mx-4 mt-12 sm:mx-13 sm:mt-16 md:mx-160 md:mt-30">
      <Sign>
        <LoginForm />
      </Sign>
    </div>
  );
}
