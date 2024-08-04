import CreateNftWidget from "@/components/CreateNftWidget/CreateNftWidget";
import PageContainer from "@/components/UI/PageContainer";

export default function Create() {
  return (
    <main className="relative z-10 font-courierPrime">
      <PageContainer>
        <section className="flex min-h-screen w-full flex-auto flex-col items-center justify-center pb-6 pt-[100px] md:pt-[150px]">
          <CreateNftWidget />
        </section>
      </PageContainer>
    </main>
  );
}
