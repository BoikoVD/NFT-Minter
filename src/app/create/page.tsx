import CreateNftWidget from "@/components/CreateNftWidget/CreateNftWidget";

const styles = {
  main: "contentContainer relative z-10 font-courierPrime",
  section:
    "flex min-h-screen w-full flex-auto flex-col items-center justify-center pb-6 pt-[100px] md:pt-[150px]"
};

export default function Create() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <CreateNftWidget />
      </section>
    </main>
  );
}
