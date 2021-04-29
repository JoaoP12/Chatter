import { io } from "../http";
import { ConnectionsService} from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;
        
        const allMessages = await messagesService.listByUser(user_id);
        
        callback(allMessages);
    });

    //  Envia o socket do admin assim que requisitado
    socket.on("admin_require_admin_socket_id", async (params) => {
        const { socket_id } = await connectionsService.findByUserId(params.user_id);
        io.to(socket_id).emit("admin_send_socket_id", {
            socket_id: socket.id
        })
    });

    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;
        
        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const { socket_id } = await connectionsService.findByUserId(user_id);
        io.to(socket_id).emit("admin_send_to_client", {
            text
        });

    });
    
    socket.on("admin_user_in_support", async (params) => {
        const { user_id } = params;
        
        await connectionsService.updateAdminID(user_id, socket.id);

        const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

        io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    });
});

