function customStart()
{
  //define your javascript here
  //jquery is avaiable - except index.js
  //you can load extra scripts with $.getScript http://api.jquery.com/jQuery.getScript/
}

function customAfterStart(clientvars)
{
  console.log('got vars');
  console.log(clientvars.collab_client_vars);
  var vars = clientvars.collab_client_vars;
  function className2AuthorName(className)
  {
    var authorId = className2Author(className);
    var authorObj = clientvars.collab_client_vars.historicalAuthorData[authorId];
    if (authorObj) {
      return authorObj.name;
    } else {
      return "unknown author: " + authorId;
    }
  }
  var doc = $('iframe').contents().find('iframe').contents().find('#innerdocbody');
  console.log(doc);
  doc.on('mouseenter', 'span', function (event) {
    if (this.classList[0]) {
      var mainClass = this.classList[0];
      if (mainClass.substring(0, 7) === 'author-') {
        this.title = className2AuthorName(mainClass);
      }
    }
  });
}

function getAuthorClassName(author)
{
  return "author-" + author.replace(/[^a-y0-9]/g, function(c)
  {
    if (c == ".") return "-";
    return 'z' + c.charCodeAt(0) + 'z';
  });
}

function className2Author(className)
{
  if (className.substring(0, 7) == "author-")
  {
    return className.substring(7).replace(/[a-y0-9]+|-|z.+?z/g, function(cc)
    {
      if (cc == '-') return '.';
      else if (cc.charAt(0) == 'z')
      {
        return String.fromCharCode(Number(cc.slice(1, -1)));
      }
      else
      {
        return cc;
      }
    });
  }
  return null;
}

