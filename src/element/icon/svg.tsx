import { useEffect, useState } from "react";

interface SvgIconProps {
    url: string;
}

export default function SvgIcon({ url }: SvgIconProps) {
    const [svg, setSvg] = useState<string>("");

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const res = await fetch(url);
                const text = await res.text();
                setSvg(text);
            } catch (error) {
                console.error("Error fetching SVG:", error);
            }
        };

        fetchSvg();
    }, [url]);

    return (
        <div
            style={{
                height: "fit-content",
                display: "grid",
                placeContent: "center",
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
