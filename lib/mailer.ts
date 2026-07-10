import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(
  toEmail: string,
  toName: string,
  resetLink: string,
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const logoUrl = `${appUrl}/logo.png`;

  const mailOptions = {
    from: `"Carbivio" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Réinitialisation de votre mot de passe Carbivio",
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Réinitialisation mot de passe — Carbivio</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0e;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0e;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1c1c1a;border-radius:16px;padding:14px 24px;border:1px solid rgba(255,255,255,0.07);">
                    <img src="${logoUrl}" alt="Carbivio" width="140" height="auto"
                      style="display:block;max-width:140px;height:auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card principale -->
          <tr>
            <td style="background:#1c1c1a;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

              <!-- Bandeau orange haut -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#eca226 0%,#d4911f 100%);padding:36px 40px 32px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:rgba(0,0,0,0.15);border-radius:50%;width:52px;height:52px;text-align:center;vertical-align:middle;">
                          <span style="font-size:26px;line-height:52px;">🔐</span>
                        </td>
                        <td style="padding-left:16px;">
                          <p style="margin:0;color:rgba(21,21,20,0.7);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Sécurité du compte</p>
                          <h1 style="margin:4px 0 0;color:#151514;font-size:22px;font-weight:800;line-height:1.2;">Réinitialisation<br/>du mot de passe</h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Corps -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:36px 40px;">

                    <p style="margin:0 0 8px;color:rgba(255,255,255,0.9);font-size:17px;font-weight:600;">Bonjour ${toName} 👋</p>
                    <p style="margin:0 0 28px;color:rgba(255,255,255,0.5);font-size:15px;line-height:1.7;">
                      Nous avons reçu une demande de réinitialisation du mot de passe associé à votre compte Carbivio. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.
                    </p>

                    <!-- Bouton CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr>
                        <td align="center">
                          <a href="${resetLink}"
                            style="display:inline-block;background:linear-gradient(135deg,#eca226,#d4911f);color:#151514;text-decoration:none;font-weight:800;font-size:15px;padding:16px 40px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 4px 24px rgba(236,162,38,0.35);">
                            Réinitialiser mon mot de passe →
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Séparateur -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="border-top:1px solid rgba(255,255,255,0.06);font-size:0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- Infos sécurité -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:rgba(236,162,38,0.06);border:1px solid rgba(236,162,38,0.15);border-radius:12px;padding:16px 20px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align:top;padding-right:10px;font-size:16px;">⏱️</td>
                              <td>
                                <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6;">
                                  Ce lien est valable <strong style="color:#eca226;">1 heure</strong> uniquement.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr><td style="height:10px;"></td></tr>
                      <tr>
                        <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px 20px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align:top;padding-right:10px;font-size:16px;">🛡️</td>
                              <td>
                                <p style="margin:0;color:rgba(255,255,255,0.4);font-size:13px;line-height:1.6;">
                                  Si vous n'avez pas fait cette demande, ignorez cet email. Votre mot de passe restera inchangé.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Lien texte de secours -->
                    <p style="margin:24px 0 0;color:rgba(255,255,255,0.25);font-size:12px;line-height:1.6;">
                      Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br/>
                      <a href="${resetLink}" style="color:rgba(236,162,38,0.6);word-break:break-all;">${resetLink}</a>
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 8px;" align="center">
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.2);font-size:12px;">
                © 2026 <strong style="color:rgba(255,255,255,0.3);">Carbivio</strong> — Tous droits réservés
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.12);font-size:11px;">
                Cet email a été envoyé automatiquement, merci de ne pas y répondre.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  // En dev sans SMTP configuré : afficher le lien dans la console
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("\n========== RESET PASSWORD LINK (dev mode) ==========");
    console.log(`To: ${toEmail}`);
    console.log(`Link: ${resetLink}`);
    console.log("=====================================================\n");
    return;
  }

  await transporter.sendMail(mailOptions);
}
