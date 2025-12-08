// components/GuaranteeStrip.tsx
"use client";

import { useEffect } from "react";


type GuaranteeStripProps = {
  /** pass different video IDs per page */
  mediaId?: string;
  /** keep previous look: 1 = square, or use 16/9 etc. */
  aspectRatio?: number;
};

export default function GuaranteeStrip({
  mediaId = "63uv4q1q2u",
  aspectRatio = 1,
}: GuaranteeStripProps) {
  // Wistia's new web component loader (fallback blur + padding baked in)
  const padTop = `${100 / aspectRatio}%`;
  const swatchStyle = `
    wistia-player[media-id='${mediaId}']:not(:defined) {
      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
      display: block;
      filter: blur(5px);
      padding-top: ${padTop};
    }
  `;

  // Load Wistia scripts on the client only once per mediaId
  useEffect(() => {
    const ensureScript = (id: string, src: string, type?: string) => {
      if (document.getElementById(id)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.id = id;
      if (type) s.type = type;
      document.head.appendChild(s);
    };

    ensureScript("wistia-player-core", "https://fast.wistia.com/player.js");
    ensureScript(
      `wistia-embed-${mediaId}`,
      `https://fast.wistia.com/embed/${mediaId}.js`,
      "module",
    );
  }, [mediaId]);

  return (
    <section
      className="
        relative isolate w-full overflow-hidden text-black
        p-6 bg-[#111214]
      "
    >
        
      <div className="mx-auto w-full max-w-screen-2xl">
        {/* Wistia video — reserved height prevents badge pop-under */}
        <div className="mx-auto w-full max-w-3xl">
          <div className="relative w-full">
            {/* Reserve height immediately to avoid layout shift */}
            <div style={{ paddingTop: padTop }} />
            {/* Wistia custom element fills reserved box once scripts load */}
            <div className="absolute inset-0">
              <style dangerouslySetInnerHTML={{ __html: swatchStyle }} />
              <wistia-player
                media-id={mediaId}
                aspect={aspectRatio}
                className="h-full w-full block"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
