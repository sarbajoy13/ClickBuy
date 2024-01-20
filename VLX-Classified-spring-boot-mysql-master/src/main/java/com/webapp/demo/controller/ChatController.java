package com.webapp.demo.controller;

import com.webapp.demo.model.*;
import com.webapp.demo.repo.ChatRepo;
import com.webapp.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.29.226:3000"})
public class ChatController {
    @Autowired
    ChatRepo chatrepo;
    @Autowired
    UserRepo userRepo;

    @PostMapping("/chat/send-message")
    public ResponseModelParameter<Chat> sendMessage(@RequestBody Chat chat)
    {
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        Date date = new Date();
        chat.setTimestamp(dateFormat.format(date));
        Chat newChat= chatrepo.save(chat);
        return new ResponseModelParameter<Chat>(true,"message sent",newChat);
    }

    @GetMapping("/chat/list/{userid}")
    public ResponseModelList<ChatList> getChatList(@PathVariable("userid") int userid)
    {
        List<Chat> allChat=chatrepo.findAll();
        Collections.reverse(allChat);
        LinkedHashSet<Integer> idList=new LinkedHashSet<>();
        for(int i=0;i< allChat.size();i++) {
            if (allChat.get(i).getSender() == userid || allChat.get(i).getReceiver() == userid) {
                if (allChat.get(i).getSender() == userid)
                    idList.add(allChat.get(i).getReceiver());
                else if (allChat.get(i).getReceiver() == userid)
                    idList.add(allChat.get(i).getSender());
            }
        }
        ArrayList<Integer> unique=new ArrayList<>(idList);
        List<ChatList> chatList=new ArrayList<>();
        for(int id:unique)
        {
            User user=userRepo.findById(id).orElse(null);
            ChatList person=new ChatList();
            person.setUserid(user.getId());
            person.setName(user.getUsername());
            chatList.add(person);
        }
        return new ResponseModelList<ChatList>(true,"list of ids", chatList);
    }

    @PostMapping("/chat/get-all-chat")
    public ResponseModelList<Chat> getAllChat(@RequestBody AllChat allChat)
    {
        List<Chat> allchats=chatrepo.findAll();
        List<Chat> partiCularChat=new ArrayList<>();
        for(int i=0;i<allchats.size();i++)
        {
            if((allchats.get(i).getReceiver()==allChat.getId1() && allchats.get(i).getSender()==allChat.getId2())||(allchats.get(i).getSender()==allChat.getId1() && allchats.get(i).getReceiver()==allChat.getId2()))
            {
                partiCularChat.add(allchats.get(i));
            }
        }
        return new ResponseModelList<Chat>(true,"all messages",partiCularChat);
    }
}
