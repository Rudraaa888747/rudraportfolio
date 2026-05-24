import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_RECEIVES_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Using onboarding@resend.dev as the 'from' address since Resend requires a verified domain otherwise.
    // This allows the free tier to work immediately as long as you send the email to the address you signed up with.
    const { data, error } = await resend.emails.send({
      from: 'System Uplink <onboarding@resend.dev>',
      to: ['rudrachokshi441@gmail.com'], // Deliver to the user's email
      subject: `NEW TRANSMISSION: ${name} via Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; background-color: #000; color: #00ff00; padding: 20px;">
          <h2>SYSTEM MESSAGE RECEIVED</h2>
          <hr style="border-color: #00ff00; opacity: 0.3;" />
          <p><strong>OPERATOR:</strong> ${name}</p>
          <p><strong>RETURN PATH:</strong> ${email}</p>
          <br/>
          <p><strong>PAYLOAD DATA:</strong></p>
          <p style="white-space: pre-wrap; background-color: #111; padding: 15px; border-left: 2px solid #00ff00;">${message}</p>
          <br/>
          <hr style="border-color: #00ff00; opacity: 0.3;" />
          <p><em>End of Transmission.</em></p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to dispatch signal' },
      { status: 500 }
    );
  }
}
