import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const chatbotService = {
  async getResponseFromGroq(message: string) {
    const pmbContext = `
      Kamu adalah asisten virtual resmi PMB Universitas Muhammadiyah Cirebon (UMC).
      Gunakan informasi berikut untuk menjawab pertanyaan:

      - Instansi: Universitas Muhammadiyah Cirebon (UMC)
      - Unit: Portal Informasi Penerimaan Mahasiswa Baru (PMB)
      - Alamat: Kampus 2 UMC - Gedung Djuanda Lantai 1, Jl. Fatahillah No.40, Watubelah, Kec. Sumber, Kab. Cirebon, Jawa Barat 45611.
      - Telepon: (0231) 5511000
      - WhatsApp: 0852-1377-7753 atau 0811-2222-0484
      - Email: pmb@umc.ac.id
      - Pendaftaran Online: pmb.umc.ac.id
      - Pendaftaran Offline: Senin-Sabtu (08.00 - 16.00 WIB)
      - Ujian Seleksi (CBT): Senin-Sabtu

      Aturan Jawaban:
      - Jawab dengan ramah, informatif, dan profesional.
      - Jika ditanya lokasi, sebutkan Gedung Djuanda Lantai 1 di Kampus 2.
      - Jika ditanya jam buka, pastikan sebutkan Senin sampai Sabtu jam 8 pagi sampai jam 4 sore.
    `;

    const payload = `Konteks: ${pmbContext}\n\nPertanyaan User: ${message}`;

    const response: any = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input: payload,
    });

    const reasoning =
      response.output?.find((o: any) => o.type === "reasoning")?.content?.[0]
        ?.text || "Thinking...";

    const answer =
      response.output_text ||
      "Maaf, silakan hubungi WhatsApp PMB di 0852-1377-7753.";

    return { reasoning, answer };
  },
};
