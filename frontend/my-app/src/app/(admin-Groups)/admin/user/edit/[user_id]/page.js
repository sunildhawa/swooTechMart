import { getUserById } from "@/api/user";
import UserFormUI from "@/components/admin/userForm";

export default async function page({params}) {
    const {user_id} = await params
    const users = await getUserById(user_id)
    return <UserFormUI module="user" data={users?.data || {}}/>
}
