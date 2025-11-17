const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "202451003@std.umk.ac.id",
    pass: "fhmo ntof mfbr pjdy",
  },
});

exports.sendRejectionEmail = async (email, alasan) => {
  const mailOptions = {
    from: '"SISMA Portal" <202451003@std.umk.ac.id>',
    to: email,
    subject: "Pendaftaran Anda Ditolak",
    html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f9fafb; padding:30px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <div style="background:#ef4444; color:white; padding:20px; text-align:center;">
        <h2 style="margin:0;">SISMA Portal</h2>
        <p style="margin:0;">Pendaftaran Ditolak</p>
      </div>

      <div style="padding:30px;">
        <p style="font-size:16px;">Halo,</p>
        <p style="font-size:15px; color:#374151;">Maaf, pendaftaran Anda <strong>ditolak</strong> dengan alasan berikut:</p>
        
        <div style="background:#fee2e2; border-left:4px solid #dc2626; padding:15px; border-radius:6px; margin:15px 0;">
          <em style="color:#b91c1c;">${alasan}</em>
        </div>

        <p style="font-size:15px; color:#374151;">
          Silakan periksa kembali data Anda dan lakukan pendaftaran ulang jika diperlukan.
        </p>

        <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;">

        <p style="font-size:13px; color:#6b7280; text-align:center;">
          © ${new Date().getFullYear()} SISMA Portal. Semua Hak Dilindungi.
        </p>
      </div>
    </div>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
};
