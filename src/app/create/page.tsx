import CreateNftWidget from "@/components/CreateNftWidget/CreateNftWidget";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/UI/PageContainer";

export default function Create() {

    return (
        <main className="font-poppins">
        <PageContainer>
            <Header />
            <section className="w-full h-screen flex-auto flex flex-col items-center justify-center pt-[80px]">
                <CreateNftWidget/>
            </section>
        </PageContainer>
        </main>
    );
}