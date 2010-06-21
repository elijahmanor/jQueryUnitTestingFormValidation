<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<jQueryUnitTestingFormValidation.Models.ContactViewModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <span id="toolbar" class="ui-widget-header ui-corner-all">
        <button id="createContact">New Contact</button>
    </span>

    <h2><%: ViewData["Message"] %></h2>
    <p>
        To learn more about ASP.NET MVC visit <a href="http://asp.net/mvc" title="ASP.NET MVC Website">http://asp.net/mvc</a>.
    </p>

    <div id="createDialog" title="New Contact" style="display: none;">
        <% Html.EnableClientValidation(); %> 
        <% using (Html.BeginForm("Create", "Contact", FormMethod.Post, new {@id = "createPost"})) { %>
            <dl>
                <dt><%= Html.LabelFor(m => m.Name) %></dt>
                <dd>
                    <%= Html.EditorFor(m => m.Name) %>
                    <%= Html.ValidationMessageFor(m => m.Name) %>
                </dd>
                <dt><%= Html.LabelFor(m => m.Email) %></dt>            
                <dd>
                    <%= Html.EditorFor(m => m.Email) %>
                    <%= Html.ValidationMessageFor(m => m.Email)%>
                </dd>
                <dt><%= Html.LabelFor(m => m.PhoneNumber) %></dt>
                <dd>
                    <%= Html.EditorFor(m => m.PhoneNumber) %>
                    <%= Html.ValidationMessageFor(m => m.PhoneNumber)%>
                </dd>
                <dt><%= Html.LabelFor(m => m.DateOfBirth) %></dt>
                <dd>
                    <%= Html.EditorFor(m => m.DateOfBirth) %>
                    <%= Html.ValidationMessageFor(m => m.DateOfBirth)%>
                </dd>
                <dt><%= Html.LabelFor(m => m.IsMarried) %></dt>
                <dd>
                    <%= Html.EditorFor(m => m.IsMarried) %>
                    <%= Html.ValidationMessageFor(m => m.IsMarried)%>
                </dd>            
            </dl>
        <% } %>    
    </div>

    <script src="../../Content/Scripts/ContactCreateModule.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            contactCreateModule.init();
        });
    </script>
</asp:Content>
