import Image from "next/image";
import Link from "next/link";
import { getTeam, initials } from "@/lib/team";
import { pathFor, pick, type Locale } from "@/lib/i18n";

/* Ekip sayfası — içerik tamamen Sanity'den (teamMember).
   Kayıt yoksa uydurma kişi gösterilmez; davet edici bir boş durum render edilir. */

export default async function EkipPage({ locale }: { locale: Locale }) {
  const team = await getTeam(locale);

  return (
    <main data-page="ekip" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div className="eyebrow">{pick(locale, "Ekibimiz", "Our Team")}</div>
          <h1>{pick(locale, "Projede karşınızda kim olacak?", "Who will you actually work with?")}</h1>
          <p className="lead">
            {pick(
              locale,
              "SAP danışmanlığında farkı yaratan şey metodoloji değil, o metodolojiyi uygulayan kişidir. Aşağıda, projelerinizde birlikte çalışacağınız ekibi bulacaksınız.",
              "In SAP consulting the difference is not the methodology but the person applying it. Below is the team you will actually work with on your project."
            )}
          </p>
        </div>
      </div>

      <section style={{ padding: "50px 0 80px" }}>
        <div className="wrap">
          {team.length === 0 ? (
            <p className="lead" style={{ textAlign: "center", padding: "40px 0" }}>
              {pick(
                locale,
                "Ekip profillerimizi yakında burada yayınlayacağız. Bu arada bize doğrudan yazabilirsiniz.",
                "We will publish our team profiles here shortly. In the meantime, feel free to contact us directly."
              )}
            </p>
          ) : (
            <div className="tmgrid">
              {team.map((m) => (
                <article className="tmcard" key={m.id}>
                  <div className="tmphoto">
                    {m.photoUrl ? (
                      <Image src={m.photoUrl} alt={m.photoAlt || m.name} fill sizes="(max-width:640px) 45vw, 220px" style={{ objectFit: "cover" }} />
                    ) : (
                      <span className="tmavatar" aria-hidden="true">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <h3>{m.name}</h3>
                  <p className="tmrole">{m.role}</p>
                  {m.bio ? <p className="tmbio">{m.bio}</p> : null}
                  {m.expertise.length ? (
                    <ul className="tmtags">
                      {m.expertise.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  ) : null}
                  {m.linkedin ? (
                    <a className="tmlink" href={m.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn ↗
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          )}

          <div className="tmcta">
            <p>
              {pick(
                locale,
                "Ekibimize katılmak ister misiniz? Açık pozisyonlarımıza göz atın.",
                "Want to join the team? Take a look at our open positions."
              )}
            </p>
            <Link className="btn btn-g" href={pathFor("conforcus-way", locale)}>
              {pick(locale, "Kariyer olanakları", "Careers")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
