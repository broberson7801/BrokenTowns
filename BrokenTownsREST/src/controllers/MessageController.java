package controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import data.MessagePostDAO;
import entities.MessagePost;

@RestController
public class MessageController {
	
	@Autowired
	MessagePostDAO dao;
	
	@RequestMapping(path = "caseItems/{caseId}/messages/ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path = "caseItems/{caseId}/messages", method = RequestMethod.GET)
	public Set<MessagePost> index(@PathVariable int caseId) {
		return dao.index(caseId);
	}
	
	@RequestMapping(path = "caseItems/{caseId}/messages/{id}", method = RequestMethod.GET)
	public MessagePost show(@PathVariable int caseId, @PathVariable int id) {
		return dao.show(caseId, id);
	}
	
	@RequestMapping(path = "caseItems/{caseId}/messages", method = RequestMethod.POST)
	public MessagePost create(@PathVariable int caseId, @RequestBody String jsonMessagePost) {
		return dao.create(caseId, jsonMessagePost);
	}
	
	@RequestMapping(path = "caseItems/{caseId}/messages/{id}", method = RequestMethod.PUT)
	public MessagePost update(@PathVariable int caseId, @PathVariable int id, @RequestBody String jsonMessagePost) {
		return dao.update(caseId, id, jsonMessagePost);
	}
	
	@RequestMapping(path = "caseItems/{caseId}/messages/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int caseId, @PathVariable int id) {
		return dao.destroy(caseId, id);
	}

}