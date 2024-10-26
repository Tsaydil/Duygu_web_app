using DuygumWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;

namespace DuygumWebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactFormController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
    
    //post
    [HttpPost]
    public IActionResult Index(EmailData emailData)
    {
        MailMessage mailMessage = new MailMessage("duygukoyuncuaydil@gmail.com", "duygukoyuncuaydil@gmail.com");
        mailMessage.Subject = "Website yeni mesaj!";
        mailMessage.Body = "Gönderen Adı: " + emailData.Name + "\n" +
                           "Gönderen Mail: " + emailData.Email + "\n" +
                           "Mesaj: " + emailData.Message;
        mailMessage.IsBodyHtml = false;
        
        
        var smtpClient = new SmtpClient("smtp.gmail.com", 587);
        smtpClient.Credentials = new NetworkCredential("duygukoyuncuaydil@gmail.com", "tzyukmmbxxszpaji");
        smtpClient.EnableSsl = true;
        smtpClient.UseDefaultCredentials = false;
        smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;

        try
        {
            smtpClient.Send(mailMessage);
            Console.WriteLine("Email sent successfully!");
        }
        catch (Exception e)
        {
            Console.WriteLine("Error: " + e);
            throw;
        }
        
        
        // return success
        return Ok();
    }
}

