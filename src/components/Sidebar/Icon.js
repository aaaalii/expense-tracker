export default function Icon({icon, name, active}){
  const classes = active ? 'sidebar__main__icon d-flex p-2 sidebar__main__icon--active mb-2' : 'sidebar__main__icon d-flex p-2 mb-2'
  return (
    <>
      <div className={classes}>
        <div>{icon}</div>
        <div className="ms-3">{name}</div>
      </div>
    </>
  );
}