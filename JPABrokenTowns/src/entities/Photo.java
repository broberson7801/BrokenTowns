package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="photo")
public class Photo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String url;

	@OneToOne
	@JoinColumn(name = "case_item_id")
	@JsonBackReference(value="photoToCaseItem")
	private CaseItem caseItem;

	private String s3Key;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public CaseItem getCaseItem() {
		return caseItem;
	}

	public void setaCase(CaseItem caseItem) {
		this.caseItem= caseItem;
	}

	public String getS3Key() {
		return s3Key;
	}

	public void setS3Key(String s3Key) {
		this.s3Key = s3Key;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getId() {
		return id;
	}

}
