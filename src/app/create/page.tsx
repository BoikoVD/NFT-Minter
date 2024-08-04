import CreateNftWidget from "@/components/CreateNftWidget/CreateNftWidget";

export default function Create() {
  return (
    <main className="contentContainer relative z-10 font-courierPrime">
      <section className="flex min-h-screen w-full flex-auto flex-col items-center justify-center pb-6 pt-[100px] md:pt-[150px]">
        <CreateNftWidget />
      </section>
    </main>
  );
}
