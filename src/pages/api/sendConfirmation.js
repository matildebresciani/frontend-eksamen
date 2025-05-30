//maja
//en extra som sender en confirmation mail til brugeren når de har booket billetter
//Hjælp fra AI til at skabe den helt rigtige mapper og filstruktur for at sende en bekræftelsesmail til brugeren, når de har booket billetter.

import nodemailer from "nodemailer";
import { fetchEventById } from "../../api-mappe/EventsApiKald";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, navn, billetter, eventId } = req.body;

  //hente event data til mailen så der vises information om eventet dynamisk
  let event;
  try {
    event = await fetchEventById(eventId);
  } catch (error) {
    return res.status(500).json({ success: false, error: "Fejl ved hentning af event data" });
  }

  //lavet projekt gmail konto til at sende mails fra
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "moderniacuratorsdk@gmail.com",
      pass: "empnbkgrhacezvyx ",
    },
  });

  try {
    await transporter.sendMail({
      from: '"ModerniaCuratorsDK" <moderniacuratorsdk@gmail.com>',
      to: email,
      subject: "Din reservation til event",
      text: `Hej ${navn},\n\nDu har reserveret ${billetter} billet(ter).\n\nTak for din reservation!`,
      //Prompt: "hvordan styler jeg en mail i nodemailer?"
      //prompt: "hvordan kan jeg tilføje og vise vores logo i en mail?"
      html: `
 <div style="font-family:sans-serif;background:#f7f7f7;padding:0;margin:0;">
  <div style="max-width:700px;width:100%;margin:48px auto 24px auto;background:#fff;border-radius:22px;box-shadow:0 4px 24px rgba(185,28,28,0.10);padding:32px 0;">
    <div>
      <div style="text-align:center;">
        <img src="https://res.cloudinary.com/dkqozs6xd/image/upload/v1748336573/logo_mail_tglb6v.png" alt="Logo" style="max-width:56px;margin-bottom:20px;" />
        <p style="font-size:1.4rem;color:#b91c1c;font-weight:bold;margin:0 0 20px;">Tak for din reservation!</p>
      </div>
      <table style="margin:0 auto;font-size:1rem;color:#111;line-height:1.6;border-collapse:collapse;">
        <tr>
          <td style="padding:0 6px 2px 0;font-weight:bold;text-align:right;">Event:</td>
          <td style="padding:0 0 2px 0;text-align:left;">${event.title}</td>
        </tr>
        <tr>
          <td style="padding:0 6px 2px 0;font-weight:bold;text-align:right;">Sted:</td>
          <td style="padding:0 0 2px 0;text-align:left;">${event.location?.address}</td>
        </tr>
        <tr>
          <td style="padding:0 6px 2px 0;font-weight:bold;text-align:right;">Dato:</td>
          <td style="padding:0 0 2px 0;text-align:left;">${event.date}</td>
        </tr>
      </table>
      <p style="margin-top:24px;font-size:1.1rem;color:#111;text-align:center;">Se dine billetter herunder:</p>
    </div>

    <div style="margin:0 24px;">
   { //Dynamisk generering af billetter så det antal man har booket også dukker op i mailen }
      ${Array.from({ length: billetter })
        .map(
          (_, idx) => `
        <div style="background:#fff;border:2px solid #b91c1c;border-radius:16px;padding:24px 20px 20px 20px;margin:32px auto;max-width:340px;box-shadow:0 2px 12px rgba(0,0,0,0.1);position:relative;">
          <img src="https://res.cloudinary.com/dkqozs6xd/image/upload/v1748336573/logo_mail_tglb6v.png" alt="Logo" style="position:absolute;top:20px;right:20px;width:52px;" />
          <div style="font-size:1.4rem;font-weight:bold;color:#111;margin-bottom:16px;">${event.title}</div>
          <div style="font-size:1.1rem;font-weight:bold;color:#b91c1c;margin-bottom:4px;">${event.date}</div>
          <div style="font-size:1rem;color:#111;margin-bottom:24px;">${event.location?.address}</div>
          <div style="text-align:center;">
            <img 
              src="https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(`${eventId}-${idx + 1}-${navn}`)}&scale=2.2&height=70&background=fff&includetext=false&linecolor=222" 
              alt="Barcode" 
              style="width:92%;max-width:300px;margin:0 auto;display:block;" 
            />
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <div style="text-align:center;padding:0 24px;">
      <p style="margin:24px 0 0;color:#000;">Vis denne billet-mail ved indgangen.<br>Vi glæder os til at se dig/jer!</p>
    </div>

    <hr style="margin:32px 0 16px;border:none;border-top:1px solid #eee;">
    <div style="text-align:center;color:#b91c1c;font-weight:bold;font-size:1.1rem;">Modernia Curators Copenhagen</div>
  </div>

  <style>
    @media (max-width: 500px) {
      div[style*="max-width:700px"] {
        max-width: 94vw !important;
        padding: 16px 0 !important;
      }
    }
  </style>
</div>
`,
    });
    //fortæller om mailen er sendt i console enten true eller false.
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
