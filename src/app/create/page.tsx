import CreateNftWidget from "@/components/CreateNftWidget/CreateNftWidget";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/UI/PageContainer";

export default function Create() {

    return (
        <main className="font-courierPrime z-10 relative">
        <PageContainer>
            <Header />
            <section className="w-full min-h-screen flex-auto flex flex-col items-center justify-center pt-[100px] pb-6 md:pt-[150px]">
                <CreateNftWidget/>
            </section>
        </PageContainer>
        </main>
    );
}