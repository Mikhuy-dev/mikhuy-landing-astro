// src/pages/api/sendEmail.ts
export const prerender = false;
import brevo from "@getbrevo/brevo";

export async function POST({ request }: { request: Request }) {
  const { name, email, phone, message, imageBase64 } = await request.json();
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    import.meta.env.BREVO_API_KEY
  );

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = `${name} te ha escrito desde mikhuy landing page`;
  sendSmtpEmail.to = [{ email: "proyectsutp@gmail.com", name: "PossionQ" }];
  sendSmtpEmail.htmlContent = `
<html>
  <body style="background: #f7fafc; font-family: 'Segoe UI', Arial, sans-serif; margin:0; padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7fafc; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(74,144,226,0.08); padding: 32px;">
            <tr>
              <td align="center" style="padding-bottom: 24px;">
                <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="64" height="64" alt="Mensaje" style="display:block; margin:0 auto 12px;" />
                <h1 style="color: #4A90E2; font-size: 28px; margin: 0 0 8px 0;">Nuevo mensaje de contacto</h1>
                <p style="color: #333; font-size: 16px; margin: 0;">Has recibido un mensaje desde la web de mikhuy</p>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 16px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 16px; color: #333;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nombre:</td>
                    <td style="padding: 8px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold;">Teléfono:</td>
                    <td style="padding: 8px 0;">${phone || "-"}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 16px;">
                <div style="background: #f4f4f4; border-radius: 8px; padding: 18px; font-size: 17px; color: #222;">
                  <span style="font-weight: bold; color: #4A90E2;">Mensaje:</span><br />
                  ${message}
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 12px; color: #aaa; font-size: 13px;">
                <em>Este correo fue generado automáticamente por tu sitio web.</em>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
  sendSmtpEmail.sender = { email: "proyectsutp@gmail.com", name };

  // Adjuntar imagen si viene en base64
  if (imageBase64 && typeof imageBase64 === "string") {
    // Extraer el tipo y los datos
    const matches = imageBase64.match(
      /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/
    );
    if (matches) {
      const mimeType = matches[1];
      if (
        !["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
          mimeType
        )
      ) {
        return new Response(
          JSON.stringify({
            message: "Formato de imagen no soportado. Usa PNG, JPG o GIF.",
            status: 400,
          }),
          { status: 400 }
        );
      }
      const base64Data = matches[2];
      // Nombre de archivo sugerido
      const ext = mimeType.split("/")[1] || "png";
      sendSmtpEmail.attachment = [
        {
          name: `logo-adjunta.${ext}`,
          content: base64Data,
        },
      ];
    }
  }

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return new Response(
      JSON.stringify({
        message: "Correo mandado exitosamente",
        result,
        status: 200,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending mail", error);
    return new Response(
      JSON.stringify({
        message: "Error al enviar el correo",
        error,
        status: 500,
      }),
      {
        status: 500,
      }
    );
  }
}
