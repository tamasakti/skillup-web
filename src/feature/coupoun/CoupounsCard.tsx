

interface cardCoupoun {
    key:string,
    coupoun:string,
    coupounPrice:string,
    createdAt?:any,
    createdBy:string,
    onDelete: any,
    onEdit:any
}



const CoupounsCard = ({onDelete, onEdit,key,coupoun, coupounPrice, createdBy}: cardCoupoun) => {
  return (
    <div className="shadow-xl card w-80 bg-base-100" key={key}>
  <div className="card-body">
    <div className="flex justify-between">

  <div className="badge badge-primary">{coupounPrice}</div>
  </div>
    <h2 className="card-title">{coupoun}</h2>
    <div>
    <p>This Coupoun you can apply to any course you want</p>
    <p>{createdBy}</p>
    </div>
    
    <div className="justify-end card-actions">
        
      <button onClick={() => onEdit(key)}>Edit</button>
      <button onClick={() => onDelete(key)}>Delete</button>
    </div>
  </div>
</div>
  )
}

export default CoupounsCard