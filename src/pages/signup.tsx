import Sign from "@/views/sign";
import SignUpForm from "@/views/sign/components/SignUpForm";

export default function Page() {
  return (
    <div className="mx-4 mt-12 sm:mx-13 sm:mt-16 md:mx-160 md:mt-30">
      <Sign>
        <SignUpForm />
      </Sign>
    </div>
  );
}
