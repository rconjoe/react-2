

export default function Profile({ userProfile }) {
  const {
    email,
    bio,
    profilePhoto,
    stats,
    uid,
    username
  } = userProfile;
  return (<>
    <div className='flex flex-col gap-2 place-items-center'>
      <img src={profilePhoto} className='w-[250px] h-[250px] rounded-full border-2 border-slate-500 shadow-lg' />
      <p className='text-2xl text-bold text-slate-200'>{username}</p>
      <p className='text-slate-200'>{email}</p>
      <p className='text-slate-200'>{bio}</p>
    </div>
  </>)
}
