"use client";
import Home from "@/component/home/home";
import Container from "@/element/container/container";

export default function Page() {
    return (
        <div className="home">
            <Container>
                <Home />
            </Container>
        </div>
    );
}