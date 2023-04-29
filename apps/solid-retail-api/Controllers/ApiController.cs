using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace Sr.SolidRetailApi.Controllers
{
  [ApiController]
  [Produces("application/json")]
  public class ApiController : ControllerBase
  {
    protected IActionResult Problem(List<IError> errors)
    {
      var firstError = errors.First();

      var statusCode = firstError.Metadata.TryGetValue("StatusCode", out var statusCodeValue)
        ? (int)statusCodeValue
        : StatusCodes.Status500InternalServerError;

      var title = firstError.Metadata.TryGetValue("Title", out var titleValue)
        ? (string)titleValue
        : null;

      return Problem(
        title: title,
        detail: firstError.Message,
        statusCode: statusCode);
    }
  }
}
