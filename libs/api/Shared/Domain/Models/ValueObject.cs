namespace Sr.Api.ProductsCatalogue.Domain.Common.Models
{
  public abstract class ValueObject : IEquatable<ValueObject>
  {
    protected abstract IEnumerable<object> GetEqualityComponents();

    public override bool Equals(object? obj)
    {
      if (obj is null || obj.GetType() != GetType())
      {
        return false;
      }

      ValueObject other = (ValueObject)obj;

      return GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());
    }

    protected static bool EqualOperator(ValueObject left, ValueObject right)
    {
      return Equals(left, right);
    }

    protected static bool NotEqualOperator(ValueObject left, ValueObject right)
    {
      return !Equals(left, right);
    }

    public override int GetHashCode()
    {
      return GetEqualityComponents()
        .Select(value => (value?.GetHashCode()) ?? 0)
        .Aggregate((acc, current) => acc ^ current);
    }

    public bool Equals(ValueObject? other)
    {
      return Equals((object?)other);
    }
  }
}
