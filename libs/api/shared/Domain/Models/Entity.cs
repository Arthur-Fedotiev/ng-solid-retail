namespace Sr.Api.Shared.Domain.Models;

public abstract class Entity<TId> : IEquatable<Entity<TId>> where TId : notnull
{
  public TId Id { get; protected set; }

  protected Entity(TId id)
  {
    Id = id;
  }

  public override bool Equals(object? obj)
  {
    return obj is Entity<TId> otherEntity && Equals(otherEntity);
  }

  public static bool operator ==(Entity<TId> left, Entity<TId> right)
  {
    return Equals(left, right);
  }

  public static bool operator !=(Entity<TId> left, Entity<TId> right)
  {
    return !Equals(left, right);
  }

  public override int GetHashCode()
  {
    return Id.GetHashCode();
  }

  public bool Equals(Entity<TId>? otherEntity)
  {
    return Equals((object?)otherEntity);
  }
}
