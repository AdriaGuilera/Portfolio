export default function Org({ name, url }: { name: string; url?: string }) {
  return (
    <p className="org">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name} <span aria-hidden="true">&#8599;</span>
        </a>
      ) : (
        name
      )}
    </p>
  )
}
