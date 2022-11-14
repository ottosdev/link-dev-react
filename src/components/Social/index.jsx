import "./social.css";
export default function Social({ url, children }) {
  return (
    <a className="social" href={url} target="_blank">
      {children}
    </a>
  );
}
